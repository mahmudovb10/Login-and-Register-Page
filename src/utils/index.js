function getRandomGradient() {
  const getRadmonColor = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;

  const color1 = getRadmonColor();
  const color2 = getRadmonColor();
  const angle = Math.floor(Math.random() * 360);

  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

export default getRandomGradient;
