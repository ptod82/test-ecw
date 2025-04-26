import imgTest from '../assets/img-test.png'
import WorldMap from './WorldMap'

export default function Chart() { 
  return (
    <div>
      This is a chart test
      <img src={imgTest} />
      <WorldMap />
    </div>
  )
}