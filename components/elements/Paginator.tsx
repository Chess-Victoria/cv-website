import Link from 'next/link';

interface PaginatorProps {
  current: number;
  total: number;
  makeHref: (page: number) => string;
}

export default function Paginator({ current, total, makeHref }: PaginatorProps) {
  return (
    <div className="pagination-area">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <Link className="page-link" href={makeHref(Math.max(1, current - 1))} aria-label="Previous">
              <i className="fa-solid fa-angle-left" />
            </Link>
          </li>
          {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
            <li key={p} className="page-item">
              <Link className={`page-link${p === current ? ' active' : ''}`} href={makeHref(p)}>{p}</Link>
            </li>
          ))}
          <li className="page-item">
            <Link className="page-link" href={makeHref(Math.min(total, current + 1))} aria-label="Next">
              <i className="fa-solid fa-angle-right" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}


