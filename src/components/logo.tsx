import Image from "next/image";

interface LogoProps {
  height?: number;
  width?: number;
}

const Logo = ({ width = 48, height = 48 }: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <Image src="/logo.svg" alt="logo" height={height} width={width} />
      <span className="font-bold text-[26px]">Jira Clone</span>
    </div>
  );
};

export { Logo };
