
const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name}
      </p>
      <p>
        {part.exercises}
      </p>
    </>
  )
}

const Content = ({course}) => {
  return (
    <div>
       {course.parts.map((part, index) => (
        <Part key={index} part={part} />
       ))}
        
    </div>
  )
}

export default Content