import styles from "./styles.module.css";
import ReviewRating from "../ReviewRating/ReviewRating";

interface Review {
  rating: number;
  title: string;
  description: string;
}

export default function CustomerReviews({
  reviews,
  className,
}: {
  reviews: Review[];
  className?: string;
}) {
  return (
    <>
      <div className={`${styles.reviews}`}>
        {reviews.map((review) => (
          <div className={`${className} p-5 gap-y-2 mb-4`} key={review.title}>
            <span className={styles.rating}>
              <ReviewRating rating={review.rating} starColor="#FFB951" />
            </span>
            <h3 className={styles.title}>{`"${review.title}"`}</h3>
            <p className={styles.text}>{review.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
