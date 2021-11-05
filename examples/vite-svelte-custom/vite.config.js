import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'
export default defineConfig({
  plugins: [
    svelte(),
    Icons({
      compiler: {
        extension: 'svelte',
        compiler: compilerFactory(),
      },
    }),
  ],
})

function customSvelteCompiler(svg) {
  const openTagStart = svg.indexOf('<svg ')
  const openTagEnd = svg.indexOf('>', openTagStart)
  const closeTagStart = svg.lastIndexOf('</svg')
  const attributes = svg.slice(openTagStart + 5, openTagEnd)
  const content = svg.slice(openTagEnd + 1, closeTagStart)
  return `<script>
  import CustomSvg from "/src/CustomSvg.svelte";
  const content=\`${content.replace(/`/g, '&#96;')}\`;
</script>
<CustomSvg ${attributes} {...$$props} {content}/>
`
}

async function compilerFactory() {
  return Promise.resolve(customSvelteCompiler)
}
