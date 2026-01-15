import React from 'react';
import style from './page.module.scss';
import Link from 'next/link';

const About = () => { 
    return (
      <div className={style.aboutPage}>
        <div className={style.contentWrapper}>
            
            <div className={style.titleSection}>
                <h1>About Hortus</h1>
                <h2>Preserving Nature</h2>
            </div>

            <div className={style.textSection}>
                <div className={style.imageSection}>
                    <span>Image Placeholder (e.g., Team or Greenhouse)</span>
                </div>

                <h3>Our Mission</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <h3>The Project</h3>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                </p>

                <h3>Contact Us</h3>
                <p>
                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                </p>
            </div>
            
            <div style={{marginTop: '2rem'}}>
                 <Link href="/vivarium" style={{ textDecoration: 'underline', color: '#F8EC89', fontWeight: 'bold' }}>
                    EXPLORE THE VIVARIUM →
                 </Link>
            </div>
        </div>
      </div>
    );
}
  
export default About;