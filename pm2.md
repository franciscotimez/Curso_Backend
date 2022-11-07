
## pm2 en FORK mode

```bash
$ pm2 start app.js --name="Server1" --watch -- -p 8081
$ pm2 start app.js --name="Server2" --watch -- -p 8082
[PM2] Starting C:\Users\franc\Documents\Cursos\CoderHouse\Curso_Backend\app.js in fork_mode (1 instance)
[PM2] Done.
┌─────┬────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name       │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ Server1    │ default     │ 1.0.0   │ fork    │ 27432    │ 47s    │ 1    │ online    │ 0%       │ 83.3mb   │ franc    │ enabled  │
│ 1   │ Server2    │ default     │ 1.0.0   │ fork    │ 23788    │ 0s     │ 0    │ online    │ 0%       │ 50.2mb   │ franc    │ enabled  │
└─────┴────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

$ tasklist /fi "imagename eq node.exe"

Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                     31368 Console                    1    40,280 KB
node.exe                     26608 Console                    1    82,368 KB
node.exe                     10996 Console                    1    45,648 KB
node.exe                     27432 Console                    1    89,580 KB
node.exe                     23788 Console                    1    88,072 KB
```

## pm2 en CLUSTER mode

```bash
$ pm2 start app.js --name="Server1" --watch -i max -- -p 8081
[PM2] Starting C:\Users\franc\Documents\Cursos\CoderHouse\Curso_Backend\app.js in cluster_mode (0 instance)
[PM2] Done.
┌─────┬────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name       │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ Server1    │ default     │ 1.0.0   │ cluster │ 34212    │ 1s     │ 0    │ online    │ 0%       │ 41.9mb   │ franc    │ enabled  │
│ 1   │ Server1    │ default     │ 1.0.0   │ cluster │ 6220     │ 1s     │ 0    │ online    │ 0%       │ 41.6mb   │ franc    │ enabled  │
│ 2   │ Server1    │ default     │ 1.0.0   │ cluster │ 34396    │ 1s     │ 0    │ online    │ 0%       │ 41.6mb   │ franc    │ enabled  │
│ 3   │ Server1    │ default     │ 1.0.0   │ cluster │ 15544    │ 1s     │ 0    │ online    │ 0%       │ 41.9mb   │ franc    │ enabled  │
│ 4   │ Server1    │ default     │ 1.0.0   │ cluster │ 30876    │ 1s     │ 0    │ online    │ 0%       │ 41.7mb   │ franc    │ enabled  │
│ 5   │ Server1    │ default     │ 1.0.0   │ cluster │ 31856    │ 1s     │ 0    │ online    │ 0%       │ 42.1mb   │ franc    │ enabled  │
│ 6   │ Server1    │ default     │ 1.0.0   │ cluster │ 16428    │ 1s     │ 0    │ online    │ 0%       │ 41.8mb   │ franc    │ enabled  │
│ 7   │ Server1    │ default     │ 1.0.0   │ cluster │ 4376     │ 1s     │ 0    │ online    │ 0%       │ 42.0mb   │ franc    │ enabled  │
│ 8   │ Server1    │ default     │ 1.0.0   │ cluster │ 29740    │ 1s     │ 0    │ online    │ 0%       │ 41.6mb   │ franc    │ enabled  │
│ 9   │ Server1    │ default     │ 1.0.0   │ cluster │ 10324    │ 1s     │ 0    │ online    │ 0%       │ 41.5mb   │ franc    │ enabled  │
│ 10  │ Server1    │ default     │ 1.0.0   │ cluster │ 34196    │ 0s     │ 0    │ online    │ 0%       │ 41.3mb   │ franc    │ enabled  │
│ 11  │ Server1    │ default     │ 1.0.0   │ cluster │ 34976    │ 0s     │ 0    │ online    │ 0%       │ 41.3mb   │ franc    │ enabled  │
│ 12  │ Server1    │ default     │ 1.0.0   │ cluster │ 35244    │ 0s     │ 0    │ online    │ 0%       │ 41.3mb   │ franc    │ enabled  │
│ 13  │ Server1    │ default     │ 1.0.0   │ cluster │ 35512    │ 0s     │ 0    │ online    │ 0%       │ 41.6mb   │ franc    │ enabled  │
│ 14  │ Server1    │ default     │ 1.0.0   │ cluster │ 35732    │ 0s     │ 0    │ online    │ 0%       │ 41.4mb   │ franc    │ enabled  │
│ 15  │ Server1    │ default     │ 1.0.0   │ cluster │ 26736    │ 0s     │ 0    │ online    │ 0%       │ 41.6mb   │ franc    │ enabled  │
└─────┴────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

$ tasklist /fi "imagename eq node.exe"

Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                     31368 Console                    1    40,280 KB
node.exe                     26608 Console                    1    81,316 KB
node.exe                     10996 Console                    1    74,652 KB
node.exe                     34212 Console                    1    38,944 KB
node.exe                      6220 Console                    1    38,668 KB
node.exe                     34396 Console                    1    38,692 KB
node.exe                     15544 Console                    1    38,912 KB
node.exe                     30876 Console                    1    38,856 KB
node.exe                     31856 Console                    1    38,768 KB
node.exe                     16428 Console                    1    39,084 KB
node.exe                      4376 Console                    1    38,684 KB
node.exe                     29740 Console                    1    38,904 KB
node.exe                     10324 Console                    1    38,732 KB
node.exe                     34196 Console                    1    38,904 KB
node.exe                     34976 Console                    1    38,832 KB
node.exe                     35244 Console                    1    38,824 KB
node.exe                     35512 Console                    1    38,648 KB
node.exe                     35732 Console                    1    38,608 KB
node.exe                     26736 Console                    1    38,820 KB
```