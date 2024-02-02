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
      (payload) => {
        handleInserts(payload.new);
      }
    )
    .subscribe();

  //select all data from sensors
  let { data, error } = await database.from("sensors").select("*");
  console.log(data);
  handleInserts(data[0]);
});

function handleInserts(data) {
  //variables
  const x = data.values.x;
  const y = data.values.y;
  const time = data.updated_at;
  const id = data.id;
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
