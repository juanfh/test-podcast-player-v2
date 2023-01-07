export const formatSecondsToHours = (secondsString: string) => {

  if (secondsString.indexOf(":") > -1) {
    return secondsString
  }

  const secNum = parseInt(secondsString, 10)
  const hours = Math.floor(secNum / 3600)
  const minutes = Math.floor((secNum - (hours * 3600)) / 60)
  const seconds = secNum - (hours * 3600) - (minutes * 60)

  let time = ""
  if (hours > 0) {
    if (hours < 10) { time += "0" }
    time += hours + ":"
  }
  if (minutes < 10) { time += "0" }
  time += minutes + ":"
  if (seconds < 10) { time += "0" }
  time += seconds

  return time

}