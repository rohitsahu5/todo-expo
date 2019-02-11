import { db } from "../../firebase";
export function getTasks() {
  var all = [];
  db.collection("tasks").onSnapshot(data => {
    data.docs.forEach(element => {
      console.log(element.data);
      const task = element.data();
      all.push(task);

      return {
        type: "getTasks",
        payload: all
      };
    });
  });
}
