# Trading data fetch and cache server

## Workflow (planned)

```
UI -> req -> SERVER -> checkTimeDiffForSameReqEndpoint -> (time less than 2s) -> return cached response
                                                       |
                                                        -> (time greater than 2s) -> return fresh response -> cache the current response
``` 



## File Structure 
```
.
├── README.md
├── package-lock.json
├── package.json
├── settings.yaml
├── src
│   ├── app.ts
│   ├── env.ts
│   └── service
│       ├── cacheService.ts
│       └── requestService.ts
└── tsconfig.json
```
