
import { createDelegatedRoutingV1HttpApiServer } from '@helia/delegated-routing-v1-http-api-server'
import { buildConfig, createNode } from '@trust0/node';
import debug from 'debug'

const sk = process.env.PRIVATE_KEY || '43efb4a2323a7a67c53048db7aefac42b268875370a033b66603664b3d1c638fb73cae97084794870c672080bc62de485d334e730f666aa7a1ac40f8306f29fd'
const PORT = parseInt(process.env.PORT || '6060');
const WS_PORT = parseInt(process.env.WS_PORT || '6161');

debug.enable('libp2p:*,relay:*');

const log = debug('relay:server');

const announceAddress = process.env.ANNOUNCE_ADDRESS ||
  `/ip4/127.0.0.1/tcp/${WS_PORT}/ws/p2p/12D3KooWN9eSm76VqSwSR17vo5QKGBqzjYN5xTY3WdNGVfb9jFFA`;

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
        announceAddress
      ]
    },
    sk: sk
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
