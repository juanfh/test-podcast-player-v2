import moment from "moment"
import "moment/locale/es"

export const formatDate = (date: string, locale: string = "es", format = "DD MMM YYYY") => {
  moment.locale(locale)
  return moment(date).format(format)
}
