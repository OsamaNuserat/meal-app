import styles from "./Watch.module.css";

const Watch = () => {
  return (
    <section className="watch vh-100">
      <div className="container">
        <h2 className="text-center">
          Watch <span className={styles.works}>It Works</span>{" "}
        </h2>
        <div className="row mt-5">
          {/* first */}
          <div className="col-md-4">
            <div className="card">
              <img
                src="images/three.jpg"
                className="card-img-top img-fluid"
                alt="burger promo"
              />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>

          {/* second */}
          <div className="col-md-4">
            <div className="card">
              <img
                src="images/one.jpg"
                className="card-img-top img-fluid"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>

          {/* third */}

          <div className="col-md-4">
            <div className="card">
              <img
                src="images/two.jpg"
                className="card-img-top img-fluid"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Watch;
