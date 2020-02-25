import React from "react";
import ReactDOM from "react-dom";
import moment from 'moment';
import { DatePicker } from "antd";
let local = 'YYYY-MM-DD HH:mm:ss'

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  // console.log(current)
  const end = moment().add(90, 'days')

  // console.log(current.format(local), end.format(local), moment().subtract(1, 'days').format(local))
  const isBefore = current < moment().subtract(1, 'days').endOf('day')
  
  const isAfter = current.isAfter(end)
  return isAfter || isBefore
}

function disabledDateTime(date) {
  let hour = []
  let min = []
  let sec = []
  // debugger
  console.log('date', date)
  date = date || moment()
  if (date.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
    let start = moment().add(5, 'minutes')
    hour = range(0, 24).splice(0, start.hour())
    // console.log(date.hour() , start.hour())
    if (date.hour() <= start.hour()) {
      min = range(0, 60).splice(0, start.minutes())
    }
    // min = range(0, 60).splice(0, start.minutes())
    // sec = range(0, 60).splice(0, start.seconds())
    // console.log(start.hour(), start.minutes(), start.seconds(), hour, min, sec)
  }
  // console.log(hour, min, sec)
  return {
    disabledHours: () => hour,
    disabledMinutes: () => min,
    disabledSeconds: () => sec
  };
}

export function Index() {
  return (
    <DatePicker
      format="YYYY-MM-DD HH:mm:ss"
      disabledDate={disabledDate}
      disabledTime={disabledDateTime}
      showTime={{ defaultValue: moment().add(5, 'minutes')}}
    />
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
