const ServerInfo = {
    protocol: 'Http',
    ip : '192.168.1.21',
    port: '3008'
}

const server = `${ServerInfo.protocol}://${ServerInfo.ip}:${ServerInfo.port}`

export default server
