type Props = {
  className: string;
  src: string;
};
export default function Reaction({ className, src }: Props) {
  return <img src={src} alt="reaction" className={`${className}`} />;
}
