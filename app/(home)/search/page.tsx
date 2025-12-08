"use client";
import { useState, useEffect, Suspense, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import * as client from "../client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";


export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [inputValue, setInputValue] = useState(searchQuery);
    const [results, setResults] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearchNavigation = () => {
        router.push(`/search?search=${inputValue}`);
    };

    const performSearch = async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        };
        setLoading(true);
        setError(null);
        try {
            const response = await client.searchPlaces(query);
            setResults(response.places || []);
        } catch (err) {
            setError("Failed to fetch search results. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        performSearch(searchQuery);
    }, [searchQuery]);

    return (
        <div className="container mt-4">
            <h1>Search Page</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a location..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchNavigation()}
                />
                <button className="btn btn-primary" onClick={handleSearchNavigation} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && results.length > 0 && (
                <ul className="list-group">
                    {results.map((place: { id: Key | null | undefined; displayName: { text: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; formattedAddress: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; nationalPhoneNumber: any; }) => (
                        <li key={place.id} className="list-group-item">
                            <div>
                                <Link href={`/details/${place.id}`}>
                                    <h5 className="mb-1">{place.displayName?.text}</h5>
                                </Link>
                                <p className="mb-1">{place.formattedAddress}</p>
                                <small>{place.nationalPhoneNumber || 'No phone number available'}</small>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {!loading && results.length === 0 && !error && searchQuery && (
                <p>No results found. Try a different search.</p>
            )}
        </div>
    );
}

