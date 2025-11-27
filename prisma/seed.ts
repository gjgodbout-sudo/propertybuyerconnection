// @ts-nocheck

// Seed script disabled for production build.
// You can implement real seeding logic here for local development if needed.
async function main() {
  return
}

main()
  .then(() => {
    console.log('Seed skipped in production build.')
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
