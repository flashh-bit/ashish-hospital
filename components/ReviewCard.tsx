import Image from "next/image";

type ReviewCardProps = {
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
};

export default function ReviewCard({ name, rating, text, date, avatar }: ReviewCardProps) {
  // Format date as dd/mm/yyyy
  const formattedDate = (() => {
    try {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return date;
    }
  })();

  const defaultAvatar = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  return (
    <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">
      {/* Header: Avatar, Name, Date, Stars */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
            <Image 
              src={avatar || defaultAvatar} 
              alt={name} 
              fill 
              sizes="40px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-[14px] text-gray-900 leading-tight">{name}</h4>
            <span className="text-[11px] text-gray-500 mt-0.5">{formattedDate}</span>
          </div>
        </div>
        
        {/* Stars */}
        <div className="flex items-center gap-0.5 mt-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg 
              key={star} 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill={star <= rating ? "#FBBF24" : "#E5E7EB"}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-[13px] text-gray-600 leading-relaxed italic">
        &quot;{text}&quot;
      </p>
    </article>
  );
}
