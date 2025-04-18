# Trust0 - Delegated routing IPFS node for trust0 network


Package contains the Trust0 delegated routing server, used to route the messages on the different relays connected to the network.

## Environment Variables

DO NOT USE DEFAULT ENV VARIABLES IN PRODUCTION

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `DELEGATED_ROUTING_V1_HOST` | Host URL for the delegated routing service | `http://localhost:8081` |
| `RELAY_MULTI_ADDR` | Multiaddress for the relay service | `/ip4/127.0.0.1/tcp/5050/ws` |
| `TRUSTLESS_GATEWAY` | URL for the trustless gateway | `http://localhost:8080` |
| `PORT` | Port for the relay service | `6060` |
| `WS_PORT` | Port for the relay service | `6161` |
| `PRIVATE_KEY` | Private key for the relay server | `43efb4a2323a7a67c53048db7aefac42b268875370a033b66603664b3d1c638fb73cae97084794870c672080bc62de485d334e730f666aa7a1ac40f8306f29fd` |
| `ANNOUNCE_ADDRESS` | Address that the relay server announces | `/ip4/127.0.0.1/tcp/6161/ws/p2p/12D3KooWN9eSm76VqSwSR17vo5QKGBqzjYN5xTY3WdNGVfb9jFFA` |

## Running the server

```
npx @trust0/delegated-routing
```