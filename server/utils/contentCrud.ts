import { readdir, readFile, mkdir, writeFile, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

export function parseFM(yaml: string): Record<string, any> {
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

export function esc(s: string) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

export async function listContent(type: string) {
  const dir = join(process.cwd(), 'content', type)
  if (!existsSync(dir)) return []
  const files = (await readdir(dir)).filter(f => f.endsWith('.md'))
  const items = await Promise.all(files.map(async file => {
    const raw = await readFile(join(dir, file), 'utf-8')
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
    if (!match) return null
    return { ...parseFM(match[1]), slug: file.replace('.md', ''), content: match[2].trim() }
  }))
  return items.filter(Boolean).sort((a, b) => (b!.order ?? 0) - (a!.order ?? 0))
}

export async function writeContent(type: string, slug: string, fm: string, body: string) {
  const dir = join(process.cwd(), 'content', type)
  if (!existsSync(dir)) await mkdir(dir, { recursive: true })
  await writeFile(join(dir, `${slug}.md`), `---\n${fm}\n---\n\n${body}`, 'utf-8')
}

export async function removeContent(type: string, slug: string) {
  const path = join(process.cwd(), 'content', type, `${slug}.md`)
  if (!existsSync(path)) return false
  await unlink(path)
  return true
}
