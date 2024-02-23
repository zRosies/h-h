function ReviewStar({
  filled,
  starColor = "#3D3D3D",
}: {
  filled: boolean;
  starColor?: string;
}) {
  return (
    <>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.10314 1.55616L6.06252 5.69366L1.49689 6.35928C0.67814 6.47803 0.350015 7.48741 0.943765 8.06553L4.24689 11.2843L3.46564 15.8312C3.32502 16.653 4.19064 17.2687 4.91564 16.8843L9.00002 14.7374L13.0844 16.8843C13.8094 17.2655 14.675 16.653 14.5344 15.8312L13.7531 11.2843L17.0563 8.06553C17.65 7.48741 17.3219 6.47803 16.5031 6.35928L11.9375 5.69366L9.89689 1.55616C9.53127 0.818658 8.47189 0.809283 8.10314 1.55616Z"
          fill={filled ? starColor : "none"}
          stroke={starColor}
          strokeWidth="1.5"
        />
      </svg>
    </>
  );
}

ReviewStar.defaultProps = {
  filled: false,
};

export default function ReviewRating({
  rating,
  starColor,
}: {
  rating: number;
  starColor?: string;
}) {
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(<ReviewStar key={i} filled starColor={starColor} />);
  }

  for (let i = rating; i < 5; i++) {
    stars.push(<ReviewStar key={i} starColor={starColor} />);
  }

  return <>{stars}</>;
}
