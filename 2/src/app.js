const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bGdtbnhlb2hyc2l3a2hxamhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4Nzk3NzcsImV4cCI6MjAyMjQ1NTc3N30.Z-F8w3dOtmnUXBtCBx07qw7AY86WCZzk7hFsKVeJejk";
const url = "https://gulgmnxeohrsiwkhqjhr.supabase.co";
const database = supabase.createClient(url, key);

//dom elements
const contentX = document.getElementById("x");
const contentY = document.getElementById("y");
const contentTime = document.getElementById("time");
const contentId = document.getElementById("id");
const contentAlpha = document.getElementById("alpha");
const contentBeta = document.getElementById("beta");
const contentGamma = document.getElementById("gamma");

let px = 50; // Position x and y
let py = 50;
let vx = 0.0; // Velocity x and y
let vy = 0.0;
let updateRate = 1 / 60; // Sensor refresh rate

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

async function getAccel() {
  DeviceMotionEvent.requestPermission().then((response) => {
    if (response == "granted") {
      // Add a listener to get smartphone orientation
      // in the alpha-beta-gamma axes (units in degrees)
      window.addEventListener("deviceorientation", (event) => {
        // Expose each orientation angle in a more readable way
        rotation_degrees = event.alpha;
        frontToBack_degrees = event.beta;
        leftToRight_degrees = event.gamma;

        // Update velocity according to how tilted the phone is
        // Since phones are narrower than they are long, double the increase to the x velocity
        vx = vx + leftToRight_degrees * updateRate * 2;
        vy = vy + frontToBack_degrees * updateRate;

        // Update position and clip it to bounds
        px = px + vx * 0.5;
        if (px > 98 || px < 0) {
          px = Math.max(0, Math.min(98, px)); // Clip px between 0-98
          vx = 0;
        }

        py = py + vy * 0.5;
        if (py > 98 || py < 0) {
          py = Math.max(0, Math.min(98, py)); // Clip py between 0-98
          vy = 0;
        }

        dot = document.getElementsByClassName("dot")[0];
        dot.setAttribute("style", "left:" + px + "%;" + "top:" + py + "%;");

        handleInserts(
          px,
          py,
          new Date(),
          1,
          rotation_degrees,
          frontToBack_degrees,
          leftToRight_degrees
        );
      });
    }
  });
  let res = await database
    .from("sensors")
    .update({ values: { x: e.clientX, y: e.clientY }, updated_at: new Date() })
    .eq("id", 1);
}

function handleInserts(x, y, time, id, alpha, beta, gamma) {
  //update dom elements
  contentX.innerHTML = x;
  contentY.innerHTML = y;
  contentTime.innerHTML = time;
  contentId.innerHTML = id;
  contentAlpha.innerHTML = rotation_degrees;
  contentBeta.innerHTML = frontToBack_degrees;
  contentGamma.innerHTML = leftToRight_degrees;
}

// document.addEventListener("mousemove", async (e) => {
//   let res = await database
//     .from("sensors")
//     .update({ values: { x: e.clientX, y: e.clientY }, updated_at: new Date() })
//     .eq("id", 1);
// });
