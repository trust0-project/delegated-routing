
import { createDelegatedRoutingV1HttpApiServer } from '@helia/delegated-routing-v1-http-api-server'
import { buildConfig, createNode } from '@trust0/node';
import debug from 'debug'


import { ANNOUNCE_ADDRESS, PORT, SK, WS_PORT } from './config';






debug.enable('libp2p:*,relay:*');

const log = debug('relay:server');

(async () => {
  const config = buildConfig({
    type: 'server',
    addresses: {
      listen: [
        `/ip4/127.0.0.1/tcp/${WS_PORT}/ws`,
        '/p2p-circuit',
        '/webrtc'
      ],
      announce: [
        ANNOUNCE_ADDRESS
      ]
    },
    sk: SK
  })
  const { node } = await createNode(config);
  await createDelegatedRoutingV1HttpApiServer(node, {
    listen: {
      host: '0.0.0.0',
      port:PORT
    }
  })
  console.log('DELEGATE API listening on',PORT)
  log('DELEGATE node created successfully with config', config)
  const multiAddresses = node.libp2p.getMultiaddrs();
  multiAddresses.forEach(ma => {
    console.log('DELEGATE listening on', ma.toString())
  })
  node.libp2p.addEventListener("peer:discovery", async (event) => {
    console.log('Peer discovered:', event.detail.id.toString(), "with multiaddr", event.detail.multiaddrs)
  })
})();
