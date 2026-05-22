import { readdir, readFile } from 'node:fs/promises'
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

export default defineEventHandler(async () => {
  const postsDir = join(process.cwd(), 'content', 'posts')
  if (!existsSync(postsDir)) return []

  const files = (await readdir(postsDir)).filter(f => f.endsWith('.md'))

  const posts = await Promise.all(files.map(async file => {
    const raw = await readFile(join(postsDir, file), 'utf-8')
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
    if (!match) return null
    const fm = parseFM(match[1])
    return { ...fm, slug: file.replace('.md', '') }
  }))

  return posts
    .filter(Boolean)
    .sort((a, b) => (b!.order ?? 0) - (a!.order ?? 0))
})
