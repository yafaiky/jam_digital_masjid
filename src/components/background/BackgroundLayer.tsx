import Bacground from '../../assets/images/background.jpg'

export default function BackgroundLayer() {
    return (
        <div
      className="
        fixed inset-0 
        bg-black/40
        -z-10
      "
    >
      <img
        src={Bacground}
        className="w-full h-full object-cover brightness-75"
        alt="background"
      />
    </div>
    )
}