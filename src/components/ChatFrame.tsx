interface Props {
  url: string;
}

export default function ChatFrame({ url }: Props) {
  return (
    <iframe
      src={url}
      className="w-full h-full border-0"
      allow="clipboard-read; clipboard-write; microphone; camera"
    />
  );
}