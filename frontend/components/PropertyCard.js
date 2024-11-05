import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const PropertyCard = ({ property }) => {
  const { id, price_per_acre_crore, land_media, total_land_size_in_acres, division_info } = property; // Destructure necessary fields
  const images = land_media.map((each) => each.image);

  return (
    <Card
      key={id}
      className="relative rounded-[10px] overflow-hidden shadow-md group"
    >
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="rounded-md overflow-hidden">
                <img
                  src={image}
                  alt="Property Image"
                  className="w-full h-48 object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Visibility on hover over the card */}
        <CarouselPrevious className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-black group-hover:bg-[#c4c4b6]/70 border-0" />
        <CarouselNext className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-black group-hover:bg-[#c4c4b6]/50 border-0" />
      </Carousel>
      <div className="flex space-x-2 mt-2">
        <div className="absolute top-2 right-0 space-x-1 px-2">
          <Button
            variant="ghost"
            className="h-8 w-8 rounded-full p-2 bg-white/95 hover:bg-white hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="transparent"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-heart"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 rounded-full p-2 bg-white/95 hover:bg-white hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-share2"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
            </svg>
          </Button>
        </div>
      </div>
      <div class="flex flex-col space-y-1.5 p-3">
        <h3 class="font-bold tracking-tight my-0 text-base">
          <div class="flex items-center gap-1">
            <span class="font-bold text-black">{`₹ ${
              price_per_acre_crore?.crore != 0.0
                ? price_per_acre_crore?.crore + " Cr"
                : price_per_acre_crore?.lakh + " lakhs"
            } / acre`}</span>
            <span>•</span>
            <span>{`${total_land_size_in_acres.acres} Acres ${total_land_size_in_acres.guntas != 0.0 ? total_land_size_in_acres.guntas + " Guntas" : ""} `}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#108ADD"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-badge-check"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
        </h3>
        <p class="text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <span>{`${division_info[2]?.name}, ${division_info[1]?.name} (dt)`}</span>
          </div>
        </p>
      </div>
    </Card>
  );
};

export default PropertyCard;
