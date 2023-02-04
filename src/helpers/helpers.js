export function getImdbRatingClass(inputRating)
{
    let ratingClass="text-white"
    if(Number(inputRating))
    {
        const rating=Number(inputRating)
        ratingClass= (rating>6 && rating<7.5) ? "text-warning":(rating>7.5)?"text-success":"text-danger"
    }
    return ratingClass;
}