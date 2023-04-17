type Props = {
  className: string;
  src: string;
  onClick?: () => void;
};
export default function Reaction({ className, src, onClick }: Props) {
  return <img src={src} alt="reaction" className={`${className}`} onClick={onClick} />;
}
