setTimeout(() => {
  import("@scss/app");
}, 2000);

const init = async () => {
  console.log("hello from app.js");
  await asyncFn();
  jQuery();
  utils.log("hello from app.js");
};

async function asyncFn() {
  console.log([1, 2, 3].includes(0));
}
init();
