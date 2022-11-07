
## forever en FORK mode

```bash
$ forever start --watch app.js
$ forever list
info:    Forever processes running
data:        uid  command                            script                                                          forever pid   id logfile                          uptime
data:    [0] _4Jf "C:\Program Files\nodejs\node.exe" C:\Users\franc\Documents\Cursos\CoderHouse\Curso_Backend\app.js 3180    34736    C:\Users\franc\.forever\_4Jf.log 0:0:0:10.614

$ tasklist /fi "imagename eq node.exe"

Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                      3180 Console                    7    38,952 KB
node.exe                     34736 Console                    7    81,984 KB

$ forever stopall
```

## forever en CLUSTER mode

```bash
$ forever start --watch app.js -m CLUSTER
$ forever list
info:    Forever processes running
data:        uid  command                            script                                                                     forever pid   id logfile                          uptime
data:    [0] pQOq "C:\Program Files\nodejs\node.exe" C:\Users\franc\Documents\Cursos\CoderHouse\Curso_Backend\app.js -m CLUSTER 23064   38020    C:\Users\franc\.forever\pQOq.log 0:0:0:7.822

$ tasklist /fi "imagename eq node.exe"

Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                     23064 Console                    7    38,780 KB
node.exe                     38020 Console                    7    79,624 KB
node.exe                     31320 Console                    7    80,436 KB
node.exe                     23984 Console                    7    81,180 KB
node.exe                     22920 Console                    7    80,816 KB
node.exe                     31452 Console                    7    80,892 KB
node.exe                     16260 Console                    7    80,184 KB
node.exe                      4036 Console                    7    81,400 KB
node.exe                     11164 Console                    7    80,964 KB
node.exe                     23952 Console                    7    81,056 KB
node.exe                     12188 Console                    7    80,924 KB
node.exe                     21708 Console                    7    80,924 KB
node.exe                      4580 Console                    7    80,180 KB
node.exe                     19736 Console                    7    80,116 KB
node.exe                      5872 Console                    7    80,604 KB
node.exe                     23132 Console                    7    80,232 KB
node.exe                     19208 Console                    7    80,784 KB
node.exe                     24556 Console                    7    80,692 KB

$ forever stopall
```