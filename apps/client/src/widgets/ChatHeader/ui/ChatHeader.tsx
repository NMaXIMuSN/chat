interface ChatHeaderProps {
  className?: string
  username: string
}

export const ChatHeader = ({ username }: ChatHeaderProps) => {
  return (
    <div className="py-4 px-8 border-b border-b-white border-opacity-5">
      <div className="flex gap-[10px] items-center">
        <div className="rounded-full size-[50px] bg-slate-500"/>
        <div className="text-base">
          { username }
        </div>
      </div>
    </div>
  )
}