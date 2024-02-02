import "./style.scss";
import { createClient } from "@supabase/supabase-js";

// const URL = import.meta.env.VITE_SUPABASE_URL;
// const KEY = import.meta.env.VITE_SUPABASE_KEY;
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bGdtbnhlb2hyc2l3a2hxamhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4Nzk3NzcsImV4cCI6MjAyMjQ1NTc3N30.Z-F8w3dOtmnUXBtCBx07qw7AY86WCZzk7hFsKVeJejk";
const URL = "https://gulgmnxeohrsiwkhqjhr.supabase.co"; 

const supabase = createClient(URL, KEY);

document.addEventListener("DOMContentLoaded", async () => {
  supabase
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
  let res = await supabase
    .from("sensors")
    .update({ values: { x: e.clientX, y: e.clientY }, updated_at: new Date() })
    .eq("id", 123);
});
