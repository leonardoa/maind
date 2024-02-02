const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bGdtbnhlb2hyc2l3a2hxamhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4Nzk3NzcsImV4cCI6MjAyMjQ1NTc3N30.Z-F8w3dOtmnUXBtCBx07qw7AY86WCZzk7hFsKVeJejk";
const url = "https://gulgmnxeohrsiwkhqjhr.supabase.co";
const database = supabase.createClient(url, key);


document.addEventListener("DOMContentLoaded", async () => {



	database
    .channel("sensors")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "sensors" },
      handleInserts
    )
    .subscribe();
});

function handleInserts(payload) {
  //variables
  const x = payload.new.values.x;
  const y = payload.new.values.y;
  const time = payload.new.updated_at;
  const id = payload.new.id;
  //dom elements
  const contentX = document.getElementById("x");
  const contentY = document.getElementById("y");
  const contentTime = document.getElementById("time");
  const contentId = document.getElementById("id");
  //update dom elements
  contentX.innerHTML = x;
  contentY.innerHTML = y;
  contentTime.innerHTML = time;
  contentId.innerHTML = id;
}

document.addEventListener("mousemove", async (e) => {
  let res = await database
    .from("sensors")
    .update({ values: { x: e.clientX, y: e.clientY }, updated_at: new Date() })
    .eq("id", 123);
});


// const container = document.querySelector("#container");
// const key =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bGdtbnhlb2hyc2l3a2hxamhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4Nzk3NzcsImV4cCI6MjAyMjQ1NTc3N30.Z-F8w3dOtmnUXBtCBx07qw7AY86WCZzk7hFsKVeJejk";
// const url = "https://gulgmnxeohrsiwkhqjhr.supabase.co";
// const database = supabase.createClient(url, key);


// //Document is ready
// document.addEventListener("DOMContentLoaded", async () => {
// 	// let res = await database.from("sensors").select("*");
// 	// console.log(res);
//   //display the data on the screen
// //   container.innerHTML = `<h1> X: ${res.data[0].values.x} Y: ${res.data[0].values.y}</h1>`;

//   //lets take the changes in realtime
//   const subscription = database
// 	.from("sensors")
// 	.on("*", (payload) => {
// 	  handleInserts(payload);
// 	})
// 	.subscribe();
// });

// const handleInserts = (payload) => {
//   console.log("Change received!", payload);
// };


