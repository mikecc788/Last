addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // 处理 OPTIONS 请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    })
  }

  const url = new URL(request.url)

  if (request.method === 'GET' && url.pathname === '/messages') {
    // 获取留言列表
    const messages = await MESSAGE_BOARD.get('messages')
    return new Response(messages || '[]', {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }

  if (request.method === 'POST' && url.pathname === '/messages') {
    // 添加新留言
    try {
      const message = await request.json()
      const messages = JSON.parse(await MESSAGE_BOARD.get('messages') || '[]')
      messages.unshift(message)
      await MESSAGE_BOARD.put('messages', JSON.stringify(messages.slice(0, 100))) // 只保留最新的100条

      return new Response(JSON.stringify({ success: true }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }
  }

  return new Response('Not Found', { status: 404 })
} 