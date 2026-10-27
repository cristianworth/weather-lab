export default function BrandMark({ size = 48 }: { size?: number }) {
  return (
    <img
      className="brand-mark"
      src={`${import.meta.env.BASE_URL}favicon.svg?v=horizon`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
    />
  )
}
