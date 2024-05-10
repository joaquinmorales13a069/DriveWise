import Navbar from "@/components/Navbar"; // Update the path as necessary to correctly point to your Navbar file

export default function AboutUs() {
  return (
    <section className="container mx-auto px-4 py-8 flex flex-col gap-10">
      <Navbar />
      <div className="flex flex-col center gap-5 mt-5 mx-10">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta
          dapibus est, eu placerat risus ultrices et. Fusce volutpat porta
          rutrum. Cras egestas libero vel magna suscipit, et euismod sapien
          interdum. Quisque sollicitudin velit a ullamcorper mattis. Proin sed
          urna scelerisque, commodo enim vel, ullamcorper dui. Etiam congue
          neque urna, et imperdiet orci iaculis eu. Sed finibus id massa semper
          molestie. Nunc luctus mi quis iaculis ultricies. Suspendisse finibus
          vestibulum enim, ac posuere tortor. In rutrum elit ut varius
          ultricies. Fusce orci justo, facilisis ut erat vehicula, ultricies
          mattis eros. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Cras quis odio a dui pharetra
          efficitur. Morbi lobortis lacus et accumsan bibendum. Etiam auctor
          felis diam, a blandit orci blandit sit amet. Suspendisse euismod odio
          in libero semper fringilla. Sed at eros est. Etiam in vestibulum arcu.
          Proin et tellus vestibulum lorem consequat efficitur. Nulla volutpat
          ligula id condimentum venenatis. Nunc finibus mauris magna, in
          pellentesque risus vehicula a. Morbi condimentum laoreet odio, euismod
          pretium orci placerat quis. In augue eros, mollis vitae blandit id,
          imperdiet id tortor.
        </p>
        <a href="/">
          <button className="bg-green-600 p-4 rounded-md" >Book Now</button>
        </a>
      </div>
    </section>
  );
}