
process.on('message', ({ cant, range }) => {
  let data = {};
  let start = new Date().getTime();

  for (let i = 1; i <= range; i++)
    data[i] = 0;


  for (let i = 0; i < cant; i++) {
    let numberRandom = Math.floor(Math.random() * range) + 1;
    data[`${numberRandom}`]++;
  }

  let end = new Date().getTime();

  process.send({
    cant,
    range,
    processTimeMS: end - start,
    data
  });

  process.exit();
});

process.send("ready");