import { useTypedSelector } from "../../context/store"

function Other() {
  const ss = useTypedSelector(state => state.layout);

  console.log(ss)

  return (
    <div>Other</div>
  )
}

export default Other
