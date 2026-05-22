import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

function parseFM(yaml: string): Record<string, any> {
  const result: Record<string, any> = {}
  for (const line of yaml.split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'")
    }
    result[key] = val !== '' && !isNaN(Number(val)) ? Number(val) : val
  }
  return result
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const filePath = join(process.cwd(), 'content', 'posts', `${slug}.md`)

  if (!existsSync(filePath)) throw createError({ statusCode: 404, message: 'Objava ne obstaja' })

  const raw = await readFile(filePath, 'utf-8')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) throw createError({ statusCode: 500, message: 'Napaka pri branju datoteke' })

  const fm = parseFM(match[1])
  return { ...fm, slug, content: match[2].trim() }
})
