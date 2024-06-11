interface ListItemProps {
  title: string;
}
const ListItem = ({ title }: ListItemProps) => {
  return (
    <button className="bg-[#207868] py-4 text-white rounded-md w-[260px] h-[50px] flex items-center justify-center  shadow-xl">
      {title}
    </button>
  );
};

export default ListItem;
