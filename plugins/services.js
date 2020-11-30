import userServices from "@/api/services/userServices"
import roomServices from "@/api/services/roomServices"

export default ({ $axios }, inject) => {
  inject("userServices", userServices($axios))
  inject("roomServices", roomServices($axios))
}
