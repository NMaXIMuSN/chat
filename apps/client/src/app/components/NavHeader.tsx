interface NavHeaderProps {
  className?: string
}

export const NavHeader = ({ className }: NavHeaderProps) => {
  return (
    <div className=''>
      <div className="text-sm">
        Chat
      </div>
      <div className="pt-4">
        <label>
          <input placeholder="Search" className="bg-[#2B2D34] rounded h-[30px] w-full outline-none px-3 text-sm text-opacity-[78.6] border border-transparent border-b-white border-b-opacity-5"></input>
        </label>
      </div>
    </div>
  )
}