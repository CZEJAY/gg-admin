export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex item-center justify-center h-full w-full">
            {children}
        </div>
    )
}