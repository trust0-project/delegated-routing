export const SK = process.env.PRIVATE_KEY || '43efb4a2323a7a67c53048db7aefac42b268875370a033b66603664b3d1c638fb73cae97084794870c672080bc62de485d334e730f666aa7a1ac40f8306f29fd'
export const PORT = parseInt(process.env.PORT || '6060');
export const WS_PORT = parseInt(process.env.WS_PORT || '6161');
export const ANNOUNCE_ADDRESS = process.env.ANNOUNCE_ADDRESS ||
  `/ip4/127.0.0.1/tcp/${WS_PORT}/ws/p2p/12D3KooWN9eSm76VqSwSR17vo5QKGBqzjYN5xTY3WdNGVfb9jFFA`;
