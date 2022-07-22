export default function ProfileCard() {
  return (
    <div className="col-span-4 col-start-9 row-span-2 row-start-1 mt-0 hidden xl:block">
      <img
        decoding="async"
        className="max-h-50vh rounded-br-[25%] rounded-tl-[25%] rounded-bl-3xl rounded-tr-3xl"
        src={
          new URL(`../../assets/images/SrinivasanSekar.webp`, import.meta.url)
            .href
        }
        alt="Srinivasan Sekar"
      />
    </div>
  );
}
