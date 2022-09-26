// refer https://astexplorer.net/
import MagicString from 'magic-string'
import { walk } from 'estree-walker'
import type { AcornNode, TrackModule } from './interface'

const AST_TYPES = {
  IMPORT_DECLARATION: 'ImportDeclaration',
  IDENTIFIER: 'Identifier'
}

const getImportGraph = (
  nodes: Array<
    AcornNode & {
      specifiers: Array<AcornNode>
    }
  >,
  finder: Map<string, Required<TrackModule>>
) => {
  const weaks = new Map<
    string,
    {
      alias: string
      pos: number[]
    }
  >()
  const imports = nodes.filter(({ type }) => type === AST_TYPES.IMPORT_DECLARATION)
  imports.forEach(({ source = {}, specifiers, start, end }) => {
    const { value: name } = source as AcornNode & {
      value?: string
    }
    if (!name) return
    if (!finder.get(name)) return
    specifiers.forEach((spec) => {
      const n = spec.imported ? `${name}.${(spec.imported as { name: string }).name}` : name
      weaks.set((spec.local as { name: string }).name, { alias: n, pos: [start, end] })
    })
  })

  return { weaks }
}

export const translate = (
  nodes: AcornNode,
  {
    finder,
    code
  }: {
    finder: Map<string, Required<TrackModule>>
    code: MagicString
  }
) => {
  const { weaks } = getImportGraph(nodes.body as never, finder)
  weaks.forEach(({ pos }) => code.remove(pos[0], pos[1]))
  walk(nodes, {
    enter(node) {
      if (node.type === AST_TYPES.IMPORT_DECLARATION) {
        this.skip()
        return
      }
      if (node.type === AST_TYPES.IDENTIFIER) {
        const f = node as never as {
          name: string
          start: number
          end: number
        }
        weaks.forEach(({ alias }, k) => {
          if (f.name === k) code.overwrite(f.start, f.end, alias)
        })
      }
    }
  })

  return { code }
}
