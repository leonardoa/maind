import "./style.scss";
import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_KEY;

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
