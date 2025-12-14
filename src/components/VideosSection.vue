<template>
  <section class="videos-section">
    <div class="container">
      <header class="header">
        <h2 class="title">{{ t('videos.title') }}</h2>
        <p class="subtitle">{{ t('videos.subtitle') }}</p>
      </header>

      <div class="grid">
        <div class="video" v-for="v in videos" :key="v.id">
          <blockquote
            class="tiktok-embed"
            :cite="v.url"
            data-tiktok-embed-type="video"
            :data-video-id="v.id"
          >
            <section>
              <a :href="v.url" target="_blank" rel="noopener noreferrer">{{ t('videos.viewOnTikTok') }}</a>
            </section>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

type TikTokVideo = { id: string; url: string }

const videos: TikTokVideo[] = [
  {
    id: '7564589333794098450',
    url: 'https://www.tiktok.com/@joyeria_angelie/video/7564589333794098450'
  },
  {
    id: '7566079307521543431',
    url: 'https://www.tiktok.com/@joyeria_angelie/video/7566079307521543431'
  },
  {
    id: '7528947477798505784',
    url: 'https://www.tiktok.com/@joyeria_angelie/video/7528947477798505784'
  }
]

const { t } = useI18n()

function ensureTikTokScriptLoaded(): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.tiktok.com/embed.js"]')
    if (existing) {
      // La librería ya está presente; re-ejecutar el parseo si está disponible.
      const w = window as unknown as { tiktokEmbedLoad?: () => void }
      if (typeof w.tiktokEmbedLoad === 'function') {
        w.tiktokEmbedLoad()
      }
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('No se pudo cargar el embed de TikTok'))
    document.body.appendChild(script)
  })
}

onMounted(async () => {
  try {
    await ensureTikTokScriptLoaded()
  } catch {
    // Si TikTok bloquea la carga, igual dejamos los enlaces.
  }
})
</script>

<style scoped>
.videos-section {
  width: 100%;
  padding: 4.5rem 0;
  background: linear-gradient(180deg, #0a0a0a 0%, #141414 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2.25rem;
}

.title {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.96);
}

.subtitle {
  margin: 0.75rem auto 0;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.5;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .container {
    padding: 0 1rem;
  }

  /* En celular: 3 videos en una sola fila (horizontal) con swipe */
  .grid {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 0.75rem;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scroll-padding: 1rem;
  }

  .grid::-webkit-scrollbar {
    display: none;
  }

  .grid {
    scrollbar-width: none;
  }

  .video {
    flex: 0 0 clamp(240px, 82vw, 320px);
    scroll-snap-align: start;
  }
}

.video {
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(215, 172, 67, 0.18);
  padding: 0.75rem;
}

.tiktok-embed {
  max-width: 100% !important;
}

/* TikTok embed trae estilos propios; aquí solo aseguramos que no desborde */
.video :deep(iframe),
.video :deep(blockquote) {
  width: 100% !important;
}

</style>
