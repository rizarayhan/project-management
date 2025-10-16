interface NoDataPageProps {
  text?: string;
}

const NoDataPage = ({ text }: NoDataPageProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src="/images/nodata.png"
        alt="No Data"
        className="w-56 object-center"
      />
      <p className="pl-10">{!text ? "Data Not Found" : text} </p>
    </div>
  );
};

export default NoDataPage;
